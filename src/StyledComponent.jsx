import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
`;

export const Title = styled.h2`
    text-align: center;
    color: #333;
`;

export const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;

export const Input = styled.input`
    width: 80%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const Select = styled.select`
    width: 80%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const TaskList = styled.ul`
    list-style: none;
    padding: 0;
    width: 50%;
`;

export const TaskItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 8px 0;
    border-radius: 5px;
    font-weight: bold;
    background-color: ${(props) => props.bgColor || "#fff"};
`;

export const DeleteButton = styled(Button)`
    background-color: red;

    &:hover {
        background-color: darkred;
    }
`;
