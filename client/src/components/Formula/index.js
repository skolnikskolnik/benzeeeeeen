import { Node, Context } from 'react-mathjax';

export default function Formula(props){
    return(
      <Context input="tex">
        <Node inline>{props.tex}</Node>
      </Context>
    );
  }