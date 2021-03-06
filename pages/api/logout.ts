import cookie from "cookie";
import { API_URL } from "@/config/index";

const Login = async (req: any, res: any) => {
  if (req.method === "POST") {
    // Destroy Cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0), // 1 week
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default Login;
