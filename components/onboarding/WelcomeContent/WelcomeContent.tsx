import Image from "next/image";

export const WelcomeContent = () => {
  return (
    <div>
         <Image
          src={"/images/catFull.gif"}
          alt={"cat animation"}
          width={100}
          height={100}
        />
        <h2>First time here?</h2>
        <p>It feels so cool to meet new visitors!</p>
        <p>Please make yourself at home. We promise we won&apos;t use your data for dark and evil operations.</p>
        <p>Feel free to ask questions or submit improvment ideas on our contact page (or on the github project page).</p>
        <p>Life is cool when filled with food!</p>
    </div>
  );
}; 