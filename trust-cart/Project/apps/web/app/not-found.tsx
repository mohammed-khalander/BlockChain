export default function NotFound() {
  return (
    <div className="bg-[url('https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-2.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex min-h-screen flex-col items-center justify-center px-8 py-8 sm:py-16 lg:justify-between lg:py-24">
        <p className="bg-linear-to-b from-white from-30% to-transparent bg-clip-text text-[clamp(10rem,16vw,16.625rem)] font-bold leading-none text-transparent">
          404
        </p>

        <div className="max-lg:mt-36 text-center">
          <h3 className="mb-3 text-5xl font-semibold text-white">
            Whoops!
          </h3>

          <h4 className="mb-1.5 text-3xl font-semibold text-white">
            Something went wrong
          </h4>

          <p className="mb-3 max-w-md text-white/70">
            The page you're looking for isn't found, we suggest you go back home.
          </p>

          <a
            href="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            Back to home page
          </a>
        </div>
      </div>
    </div>
  );
}
