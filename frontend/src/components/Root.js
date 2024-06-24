import styled from "styled-components";
import PropTypes from "prop-types";

const FrameChild = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  background-color: #d90000;
  width: 100%;
  height: 100%;
`;
const Empty = styled.a`
  text-decoration: none;
  position: absolute;
  top: 0px;
  left: 0px;
  color: inherit;
  display: inline-block;
  width: 100%;
  height: 100%;
  min-width: 8px;
  z-index: 1;
`;
const A = styled.a`
  text-decoration: none;
  position: absolute;
  top: 0px;
  left: 0px;
  color: inherit;
  display: inline-block;
  width: 100%;
  height: 100%;
  min-width: 8px;
  z-index: 2;
`;
const Leaf = styled.a`
  text-decoration: none;
  position: absolute;
  top: 0px;
  left: 0px;
  color: inherit;
  display: inline-block;
  width: 100%;
  height: 100%;
  min-width: 8px;
  z-index: 3;
`;
const Parent1 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
const EmptyParent = styled.div`
  position: absolute;
  top: 8px;
  left: 16px;
  width: 8px;
  height: 19px;
`;
const EllipseParent = styled.div`
  height: 34px;
  flex: 1;
  position: relative;
`;
const A1 = styled.a`
  text-decoration: none;
  position: absolute;
  top: 8px;
  left: 14px;
  color: inherit;
  display: inline-block;
  min-width: 7px;
`;
const FrameItem = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  background-color: var(--color-red-100);
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const FrameInner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  background-color: var(--color-red-100);
  width: 100%;
  height: 100%;
`;
const A2 = styled.a`
  text-decoration: none;
  position: absolute;
  top: 8px;
  left: 14px;
  color: inherit;
  display: inline-block;
  min-width: 8px;
  z-index: 1;
`;
const VectorIcon = styled.img`
  position: absolute;
  top: 10px;
  left: 14px;
  width: 10.5px;
  height: 13.5px;
  object-fit: contain;
  z-index: 1;
`;
const EllipseContainer = styled.div`
  height: 34px;
  width: 35px;
  position: relative;
`;
const RootRoot = styled.div`
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 21px 7px 22px 45px;
  box-sizing: border-box;
  gap: 9px;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  font-size: var(--font-size-xs);
  color: var(--color-black);
  font-family: var(--font-poppins);
`;

const Root = ({ className = "" }) => {
  return (
    <RootRoot className={className}>
      <EllipseParent>
        <FrameChild />
        <EmptyParent>
          <Empty>1</Empty>
          <Parent1>
            <A>1</A>
            <Leaf>1</Leaf>
          </Parent1>
        </EmptyParent>
      </EllipseParent>
      <EllipseParent>
        <A1>2</A1>
        <FrameItem />
      </EllipseParent>
      <EllipseParent>
        <FrameInner />
        <A2>3</A2>
      </EllipseParent>
      <EllipseContainer>
        <FrameInner />
        <VectorIcon loading="lazy" alt="" src="/vector-12.svg" />
      </EllipseContainer>
    </RootRoot>
  );
};

Root.propTypes = {
  className: PropTypes.string,
};