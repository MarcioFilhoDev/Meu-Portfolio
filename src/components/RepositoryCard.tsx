type RepositoryCardProps = {
  id: number;
  name: string;
  description: string;
  language: string;
  url: string;
  languageColor: string;
};

export default function RepositoryCard({
  id,
  name,
  description,
  language,
  url,
  languageColor,
}: RepositoryCardProps) {
  return (
    <a className="repository-card" href={url} target="_blank" rel="noreferrer">
      <div className="repository-card__top">
        <h3>{name}</h3>
        <span className="repository-card__id">#{id}</span>
      </div>

      <p>{description}</p>

      <div className="repository-card__bottom">
        <span className="language-tag">
          <span
            className="language-dot"
            style={{ backgroundColor: languageColor }}
          />
          {language}
        </span>
        <span className="repository-card__open">Abrir repositório</span>
      </div>
    </a>
  );
}
