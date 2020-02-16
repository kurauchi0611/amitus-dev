

import React from "react";
import dynamic from 'next/dynamic'


const myImage = dynamic(() => import('../components/List'), {
  ssr: false
})


  if (process.browser){
    console.log('hoge');
    const myImage=document.getElementById('myImage');
    const clipImage= new croppie(myImage,{
      viewport:{width:100,height:100},
      boundary: { width: 300, height: 300 },
      showZoomer: false,
      enableOrientation: true
    })
    clipImage.bind
}