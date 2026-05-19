import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import { authRoutes } from "./routes/authRoutes";
import { postRoutes } from "./routes/postRoutes";
import { userRoutes } from "./routes/userRoutes";
import { ApiError } from "./types";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Sidan eller API-routen finns inte." });
});

const errorHandler: ErrorRequestHandler = (error: ApiError, _req, res, _next) => {
  const errorStatus = error.statusCode ?? error.status;
  const statusCode = errorStatus && errorStatus >= 400 ? errorStatus : 500;
  const message = error.type === "entity.parse.failed" ? "Ogiltig JSON i request body." : statusCode === 500 ? "Något gick fel på servern." : error.message;
  res.status(statusCode).json({ message });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
