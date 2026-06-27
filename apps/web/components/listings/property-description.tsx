type PropertyDescriptionProps = {
  description: string;
};

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-foreground">About this property</h2>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </section>
  );
}
