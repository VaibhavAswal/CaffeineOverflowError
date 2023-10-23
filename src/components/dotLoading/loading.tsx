const Loading = () => {
  return (
    <svg
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
      viewBox="0 44 52 12"
    >
      {" "}
      <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
        {" "}
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        ></animate>{" "}
      </circle>{" "}
      <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
        {" "}
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        ></animate>{" "}
      </circle>{" "}
      <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
        {" "}
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        ></animate>{" "}
      </circle>{" "}
    </svg>
  );
};

export default Loading;
