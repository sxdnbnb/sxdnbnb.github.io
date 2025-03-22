export default ({ app, router, siteData }) => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.id = "LA-DATA-WIDGET";
      script.crossOrigin = "anonymous";
      script.charset = "UTF-8";
      script.src = "https://v6-widget.51.la/v6/3IdmiCNCA52rjASE/quote.js?theme=0&f=12&display=0,0,0,0,0,0,1,1";
      document.body.appendChild(script);
    }
  };
  