const LaunchButton = (props) => {
  //   Press space bar
  const pushKey = (event, action) => {
    if (event.keyCode === 32) {
      return props.selectItem;
    }
  };

  document.addEventListener("keydown", (e) => pushKey(e, "keydown"));
  document.addEventListener("keyup", (e) => pushKey(e, "keyup"));

  return <button onClick={props.selectItem}>Launch</button>;
};

export default LaunchButton;
