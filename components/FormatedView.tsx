import { ScrollView } from 'react-native';
import MathJax from "react-native-mathjax-svg"
import Markdown from 'react-native-markdown-display';

type Props = {
  text : string;
}

export default function FormatedView({text} : Props) {
  const parseText = (text:string)=>{
    const regex = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
    return text.split(regex).filter(Boolean);
  }



  const contentArray = parseText(text);

  return (
    <ScrollView style={{flex:1, paddingHorizontal:10, paddingVertical:20}}>
      {contentArray.map((line,index)=>{
        if(line.startsWith('$$')||  line.startsWith('$')){
          return(
            <MathJax key={index}>{line.trim()}</MathJax>
            
          )
        }
        else{
          return(
            <Markdown key={index}>{line}</Markdown>
          )
        }
      })}
    </ScrollView>
  );
}