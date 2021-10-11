const Dot = ({ color }) => {
   return (
      <span
         style={{
            display: "inline-block",
            width: 10,
            height: 10,
            background: color,
            marginRight: 6,
         }}
      ></span>
   );
};

export default Dot;
