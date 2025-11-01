import Button from "./Button";

function SecondaryCard({ title, body, layout = true, picture }) {
  const Image = ({ alt, picture }) => (
    <img
      className="h-full w-full transform rounded-xl object-cover object-[center_60%] shadow-xl transition-transform duration-500 hover:scale-103"
      src={picture}
      alt={`${alt}.png`}
    />
  );

  const Caption = ({ title, body, picture }) => (
    <div className="flex flex-col items-start">
      <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
      <p className="text-base">{body}</p>
      <br />
      <div className="h-10 w-50">
        <Button text={"Baca selengkapnya"} color="" />
      </div>
    </div>
  );

  return (
    <div className="flex h-60 w-full items-center justify-around gap-10 text-black">
      {layout ? (
        <>
          <div className="h-full w-full">
            <Image alt={title} picture={picture} />
          </div>
          <Caption title={title} body={body} />
        </>
      ) : (
        <>
          <Caption title={title} body={body} />
          <div className="h-full w-full">
            <Image alt={title} picture={picture} />
          </div>
        </>
      )}
    </div>
  );
}

export { SecondaryCard };
