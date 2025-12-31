// /**
//  * Login user
//  * Endpoint: POST /api/user/login
//  */

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  // 2. Validate email
  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid email format",
    });
  }

  try {
    // 2. Fetch user by email 
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    // 3. Compare passwords
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    // 4. Reset rate limiter
    res.locals.loginSuccess = true;

    // 5. Generate token
    const token = generateToken(user);

    // 8. Success response
    return res.status(200).json({
      message: "User login successful",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
