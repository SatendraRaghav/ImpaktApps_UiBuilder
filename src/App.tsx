import { MutableRefObject, useRef } from "react";
import "./App.css";
import ComponentItem from "./page/app/components/componentPanel/ComponenItem";
import RenderComponentCanvas from "./page/app/components/dotPanel/renderComponentCanvas";
import { buildComponentList } from "./widgetLibrary/componentListBuildet";
import { WidgetConfig } from "./widgetLibrary/interface";
import { widgetBuilder } from "./widgetLibrary/widgetBuilder";
import useMeasure from "react-use-measure";
function App() {
  const propsId: WidgetConfig[] = buildComponentList();
  const parentNode: any = propsId.map((e: WidgetConfig) => {
    return widgetBuilder(e.type);
  });
  const [containerBoundRef, containerBound] = useMeasure();
  const containerRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement | null>;
  return (
    <div style= {{
    border: "8px solid #e2e4e5",
    borderRadius: "10px 10px 0 0",
    }} >
    <div style={{background:"#e2e4e5",
      borderBottom: "1px solid #e2e4e5",
      textAlign:"left",
      padding:"20px",
      // paddingLeft:"20px",
      // borderRadius: "10px 10px 0 0",
  }}>
      ImpaktApps
    </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

        }}
      >
        
        <div
          style={{
            width: "75%",
            // border: "1px solid #e2e4e5",
            borderRadius: "0 0 10px 10px ",
          }}
        >
          <div
        style={{
          borderBottom: "1px solid #e2e4e5",
        
        }}
        >
          Canvas - develop your page
        </div>
          <div
            ref={(ele) => {
              containerBoundRef(ele);
              containerRef.current = ele;
            }}
          >
            <RenderComponentCanvas
              containerPadding={8}
              containerRef={containerRef}
              canResizeY
              minHeight={containerBound.height - 16}
              safeRowNumber={0}
              addedRowNumber={40}
              parentNode={parentNode}
            />
          </div>
        </div>
        <div
          style={{
            width: "25%",
            borderLeft: "1px solid #e2e4e5",
            // borderRadius: "10px",
          }}
        >
          <div style={{ borderBottom: "1px solid #e2e4e5", 
          // borderRadius: "10px"
           }}>
            Component List
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            {propsId.map((e: WidgetConfig) => {
              return <ComponentItem {...e} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
