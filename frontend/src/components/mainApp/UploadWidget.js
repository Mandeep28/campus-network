import { useEffect } from 'react';

let cloudinary;
let widget;

const UploadWidget = ({ children, onUpload }) => {

  useEffect(() => {


    if ( !cloudinary ) {
      cloudinary = window.cloudinary;
    }


    function onIdle() {
      if ( !widget ) {
        widget = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

    // eslint-disable-next-line
  }, []);

 

  function createWidget() {

    const options = {
      cloudName: "dyk8ixmrn", 
      uploadPreset: "campus_network",
    }

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        if ( error || result.event === 'success' ) {
          onUpload(error, result, widget);
        }
      }
    );
  }



  function open() {
    if ( !widget ) {
      widget = createWidget();
    }
    widget && widget.open();
  }

  return (
    <>
      {children({ cloudinary, widget, open })}
    </>
  )
}

export default UploadWidget;