export default function RepoLink({
  repo,
}: {
  repo: { repo: string; url?: string };
}) {
  return (
    <a
      className="link"
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {repo.repo}
    </a>
  );
}
