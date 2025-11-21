import Button from "./Button";
import { H1, H2, H3, P } from "./Text";

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
      <H2 variant="text">{title}</H2>
      <br />
      <P variant="text">{body}</P>
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

function Card({ children, text, number = "0", color }) {
  return (
    <div
      className={`flex w-70 transform flex-col items-center rounded p-4 duration-500 ${color} hover:scale-105`}
    >
      {children}
      <H1 variant="white text-shadow-lg">{number}</H1>
      <H2>{text}</H2>
    </div>
  );
}

export { SecondaryCard, Card };
