import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../../common/Button";

export const AddPlacesContent = ({
  changePage,
}: {
  changePage: () => void;
}) => {
  const router = useRouter();
  return (
    <div>
      <Image
        src={"/images/spinWheelGif.gif"}
        alt={"spinning wheel"}
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />
      <h2>Lunch companion</h2>
      <p>
        Don't know what to eat today? Feeling uninspired as hell? Well we've got
        your back!
      </p>
      <p>
        <b>"Where Should We Eat"</b> will choose your next awesome lunch for you
        based on scientific yet unseizable universe laws (aka "complete
        chance").
      </p>
      <p>Spin the wheel, and let the fun begin!</p>
      <br />
      <Button onClick={() => router.push("/")}>Let's spin!</Button>
      <Button className="mt-2" variant="text" onClick={() => changePage()}>
        <small>
          <i>Actually, I'm not sure of that name anymore...</i>
        </small>
      </Button>
    </div>
  );
};
