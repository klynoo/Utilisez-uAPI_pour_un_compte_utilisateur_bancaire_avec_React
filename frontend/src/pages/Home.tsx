import React from "react";
import styled from "styled-components";
import bankTree from "../assets/bank-tree.jpeg";
import iconChat from "../assets/icon-chat.png";
import iconMoney from "../assets/icon-money.png";
import iconSecurity from "../assets/icon-security.png";

const HomePage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <ImgHero>
          <img src={bankTree} alt="bank-tree" />
        </ImgHero>
        <HeroContent>
          <HeroTitle>
            No fees. <br />
            No minimum deposit. <br />
            High interest rates.
          </HeroTitle>
          <HeroSubtitle>
            Open a savings account with Argent Bank today!
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Feature>
          <FeatureIcon>
            <img src={iconChat} alt="iconChat" />
          </FeatureIcon>
          <FeatureTitle>You are our #1 priority</FeatureTitle>
          <FeatureDescription>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </FeatureDescription>
        </Feature>

        <Feature>
          <FeatureIcon>
            <img src={iconMoney} alt="iconMoney" />
          </FeatureIcon>
          <FeatureTitle>More savings means higher rates</FeatureTitle>
          <FeatureDescription>
            The more you save with us, the higher your interest rate will be!
          </FeatureDescription>
        </Feature>

        <Feature>
          <FeatureIcon>
            <img src={iconSecurity} alt="iconSecurity" />
          </FeatureIcon>
          <FeatureTitle>Security you can trust</FeatureTitle>
          <FeatureDescription>
            We use top-of-the-line encryption to make sure your data and money
            are always safe.
          </FeatureDescription>
        </Feature>
      </FeaturesSection>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
`;

const HeroSection = styled.section``;

const HeroContent = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255);
  text-align: left;
  top: 140px;
  right: 80px;
  padding: 2rem;
`;

const ImgHero = styled.div`
  width: 100%;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
  }
`;
const HeroTitle = styled.h1`
  font-size: 1 rem;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const HeroSubtitle = styled.p`
  max-width: 300px;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const FeaturesSection = styled.section`
  margin-top: -20px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 40px 20px;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #fff;
`;
const Feature = styled.div`
  max-width: 500px;
  text-align: center;
  padding: 20px;
`;

const FeatureIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 20px auto;
  border: 10px solid #00bc77;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: #00bc77;

  img {
    width: 100px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;
