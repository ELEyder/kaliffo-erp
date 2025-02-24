import { Divider, Flex } from "antd";
import { Outlet } from "react-router-dom";

const Details = ({ children }) => {

  return (
    <>
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        align="flex-start"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        { children }
      </Flex>
    </>
  );
};

export default Details;
