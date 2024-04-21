import { FaLinkedin, FaGithub } from "react-icons/fa";
export default function About() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl mb-8">Welcome to My Portfolio</h1>
      <p className="text-lg mb-12">
        Check out my LinkedIn and GitHub profiles:
      </p>
      <div className="flex flex-col items-center">
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          className="flex items-center text-xl mb-4 text-gray-800 no-underline"
        >
          <FaLinkedin className="mr-2 text-xl" />
          LinkedIn
        </a>
        <a
          href="https://github.com/your-github-profile"
          className="flex items-center text-xl text-gray-800 no-underline"
        >
          <FaGithub className="mr-2 text-xl" />
          GitHub
        </a>
      </div>
    </main>
  );
}
