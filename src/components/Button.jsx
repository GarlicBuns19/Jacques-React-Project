import styled from 'styled-components';
export const Button = styled.button`
  margin: 10px 0 0;
  padding: 10px;
  background: transparent;
  border-radius: 10px;
  border: 3px solid #efefef;
`;

export const DangerButton = styled.button`
  margin: 10px 0 0;
  padding: 10px;
  background: red;
  color: white;
  border-radius: 10px;
`;

export function HoverBtn(props) {
    return (
        <button className={"mt-2 p-2 w-40 bg-transparent border-2 border-stone-200 rounded-lg hover:bg-slate-800 ease-in duration-300"}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}