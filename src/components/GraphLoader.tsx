import * as React from 'react'
import { PropagateLoader } from "react-spinners";
import { MainPageContext } from '../context/MainPageContext';

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};


const Loader = () => {
  const { loading } = React.useContext(MainPageContext);
  let [color, setColor] = React.useState("#ffffff");

    return loading ? (
        <div className='overlay-content'>
            <div className='flex items-center justify-center align-middle h-[70vh]'>
                <PropagateLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                    />
            </div>
        </div>
    ) : null
};

export default Loader;