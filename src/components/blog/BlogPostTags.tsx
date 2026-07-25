type BlogPostTagsProps = {
  tags: readonly string[];
};

export function BlogPostTags({ tags }: BlogPostTagsProps) {
  return (
    <ul
      className="m-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-normal text-portfolio-secondary"
      aria-label="Post tags"
    >
      {tags.map((tag, index) => (
        <li key={tag} className="inline-flex items-center gap-2">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          <span>{tag}</span>
        </li>
      ))}
    </ul>
  );
}
