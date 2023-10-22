import React, { Component } from "react";



export default class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  showToast(msg,color) {
    try{

      let a = document.getElementsByClassName("toaster")
      a[0].innerHTML = msg;
      a[0].style.display = "block";
    a[0].style.color = color || "black"
    setTimeout(() => {
      try{
        a[0].style.display = "none";
        a[0].style.color = "black"
      }catch(err){
        console.log(err)
      }
    },5000)
  }catch(err){
    console.log(err)
  }
  }

  render() {
    return <div className="toaster"></div>;
  }
}

export const toast = new Toaster(null);
