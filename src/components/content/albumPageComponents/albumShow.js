/**
 * 函数式组件，用于生成照片展示容器
 */
export default {
	name: "albumShow",
	functional: true,
	props: {
		url: String,
    desc: String,
    date: String
	},
    //ctx中有data、injections、listeners、parent、props、slots等属性
	render(h, { props, listeners }) {
    
		return h(
      "div", 
      {
        id: "albumShow",
      },
      [
        h(
          "div",
          {
            id: "backgroundContainer",
            style: {
              position: "fixed",
              width: "100vw",
              height: "100vh",
              left:"0",
              top:"0",
              background:`url(${props.url}) no-repeat`,
              backgroundSize:"100% 100%",
              filter: "blur(20px) brightness(90%)",
              zIndex: "9999"
            }
          },
          ),
        h(
          "div",
          {
            id: "contentContainer",
            style: {
              position: "fixed",
              width:"100vw",
              height:"100vh",
              left:"0",
              top:"0",
              zIndex:"10000",
            },
            on: {
              click: listeners.myClick
            }
          },
          [
            h(
              "img",
              {
                id: "photo", 
                style: {
                  position:"absolute",
                  content: `url(${props.url})`,
                  maxWidth: "30vw",
                  maxHeight: "80vh",
                  left:"28%",
                  top:"50%",
                  transform:"translate(-50%, -50%)",
                  filter: "brightness(120%)",
                  borderRadius:"10px"
                },
              }
            ),
            h(
              "div",
              {
                id: "descContainer",
                style: {
                  position:"absolute",
                  right:"18vw",
                  top:"30vh",
                  height: "50%",
                  width: "36%",
                  color:"white",
                  textAlign:"left"
                },
              },
              [
                h(
                  "div",
                  {
                    id: "desc",
                    style: {
                      fontSize: "2vw",
                      textIndent: "4vw",
                      lineHeight: "2.8vw"
                    },
                  },
                  props.desc
                ),
                h(
                  "div",
                  {
                    id: "date",
                    style: {
                      marginTop:"10vh",
                      fontSize: "1vw",
                      textAlign: "right",
                      verticalAlign: "bottom"
                    },
                  },
                  props.date
                )
              ]
            )
          ]
        )
      ]
    )
	}
}