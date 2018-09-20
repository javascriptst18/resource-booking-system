import React from 'react'
import styles, {keyframes} from 'styled-components';
import logo from '../logo.svg';
const Header = styles.header` background-color: #222; height: 250px; padding: 20px; color: white;`;
const Wrapper = styles.div`text-align: center;`;
const SpinAnimation = keyframes` from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const SmallWrapper = styles.div` font-family: 'Raleway', sans-serif; background-color: #222; position: absolute; width: 100%; text-align: center;`;
const Logo = styles.img` animation: ${SpinAnimation} infinite 20s linear; height: 80px;`;
const Card = styles.div` background-color: #fff; border-radius: 15px; max-width: 300px; margin: 4rem auto; padding: 3rem;`;

const ErrorComponent = () => {
  return (

    <div>
      <Header>
        <Logo src={logo} alt="logo"/>
        <h1>HTTP 404</h1>
      </Header>
      <Wrapper>
        <SmallWrapper>
          <Card>
            <h2>Not Found</h2>
          <p>Sorry, but this page doesn't exist. How did you even get here?</p>
          </Card>
        </SmallWrapper>
      </Wrapper>
    </div>
  )
};

export default ErrorComponent;
