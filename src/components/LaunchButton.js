const LaunchButton = () => {
  //   Press space bar
  const pushKey = (event, action) => {
    // if (event.keyCode === 32) {
    //   if (action === "keydown") {
    //     // return toggle(true);
    //   }
    //   if (action === "keyup") {
    //     // return toggle(false);
    //   }
    //   return;
    // }
  };

  document.addEventListener("keydown", (e) => pushKey(e, "keydown"));
  document.addEventListener("keyup", (e) => pushKey(e, "keyup"));

  return <button onClick={() => console.log("lauch")}></button>;
};

export default LaunchButton;
