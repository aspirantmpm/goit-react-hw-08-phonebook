import styled from '@emotion/styled';
import { Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  padding: 16px 0;
  font-size: 18px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  color: #fff;
  text-decoration: none;
  transform: scale(1);
  transition: transform 200ms ease-out;
  ::after {
    content: '';
    display: block;
    transform: scaleX(0);
    height: 2px;
    border-radius: 30px;
    background-color: #fff;
    transition: transform 200ms ease-out;
  }
  &.active {
    transform: scale(1.25);
    ::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 30px;
      transform: scaleX(1);
      background-color: #fff;
    }
  }
`;


export const MainForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
`;

export const Input = styled(Field)`
  outline: 0;
  width: 365px;
  margin-bottom: 10px;
  padding: 5px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
`;
export const List = styled.ul`
  border-radius: 5px;
  padding: 20px;
`;

export const Find = styled.div`
  width: 240px;
  margin-bottom: 20px;
  padding-left: 20px;
`;

export const FindInput = styled.input`
  outline: 0;
  width: 350px;
  padding: 5px;
`;
export const Section = styled.section`
  padding: 20px 20px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
