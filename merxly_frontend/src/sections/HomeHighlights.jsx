import React from "react";
import styled from "styled-components";

export default function HomeHighlights() {
  const items = [
    { icon: "🚚", text: "FASTED DELIVERY", sub: "Delivery in 24/H" },
    { icon: "↺", text: "24 HOURS RETURN", sub: "100% money-back guarantee" },
    { icon: "🔒", text: "SECURE PAYMENT", sub: "Your money is safe" },
  ];

  return (
    <Wrapper>
      {items.map((i) => (
        <Box key={i.text}>
          <Icon>{i.icon}</Icon>
          <div>
            <h4>{i.text}</h4>
            <p>{i.sub}</p>
          </div>
        </Box>
      ))}
    </Wrapper>
  );
}

/* Styles */

const Wrapper = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 20px 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  width: 32%;
`;

const Icon = styled.div`
  font-size: 32px;
`;
