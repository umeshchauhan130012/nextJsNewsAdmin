import React, { memo } from "react";

const Div = memo(({ className = "", style = {}, children, ...props }) => {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
});

export default Div;