import styled from "styled-components"

const Container = styled.div`

`

interface ToggleProps {
    children: string;
}

export function Toggle(props: ToggleProps) {
    return (
        <Container>
             {props.children}
        </Container>
    );
}