import { Divider, Flex } from "antd";
import { Outlet } from "react-router-dom";

const Details = ({ children }) => {

  return (
    <>
      <Flex
        wrap
        justify="space-evenly"
        gap={"large"}
      >
        { children }
      </Flex>
    </>
  );
};

export default Details;
