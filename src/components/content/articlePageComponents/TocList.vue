<template>
    <div class="tocListContainer">
      <div id="tocList">
        <span>目录：</span>
        <hr>
      </div>
      <div class="expendArray" :class="[isExpend?'expendArraydown':'expendArrayup']" @click="expend"></div>
    </div>
</template>

<script>
import debounce from "@/utils/debounce"

export default {
  data(){
    return {
      scrollDistance:0,
      activeToc:0,
      headingsOffset:[],
      anchorArr:[],
      isExpend:false,
      lastIndex: -1
    }
  },
  props: {
    isdone:Boolean
    // articleId: null
  },
  watch: {
    isdone: {
      handler(done) {
        if(done) {
          this.generateTOC()
        }
      },
      immediate: true
    },
    
  },
  methods: {
    // 遍历标题元素，生成锚点链接与目录
    generateTOC() {
      const tocList = document.getElementById('tocList');
      
      tocList.innerHTML = "<span>目录：</span><hr>"//重置目录容器，防止内容重复出现
      this.headingsOffset = []
      this.anchorArr = []
      
      
      this.$nextTick(() => {
        // 获取目录容器和内容容器
        const content = document.getElementsByClassName('content')[0];
        //虽然不太好，但为了方便，我还是在这里直接获取文章card组件对象，用以获取滚动高度
        const articleCard = document.getElementById('articleContent')
        const pageHeight = window.innerHeight || document.documentElement.clientHeight;
        //若有上一个，则先移除掉上一个，再添加下一个
        articleCard.removeEventListener('scroll', this.handleScroll.bind(this, pageHeight, articleCard))
        articleCard.addEventListener('scroll', this.handleScroll.bind(this, pageHeight, articleCard))
        const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');

        // let headingId = this.lastIndex + 1

        headings.forEach((heading, index) => {
            //如果这个标题已经计算过，就不需要再重复计算
            // if(index<=this.lastIndex) return
            const level = parseInt(heading.tagName.substring(1)); // 获取标题级别
            const title = heading.innerText; // 获取标题文本
            this.headingsOffset.push(heading.offsetTop) //获取标题位置高度

            // 为标题元素添加id属性
            heading.id = `heading${index}`;
            // headingId++;

            // 创建锚点链接
            const anchor = document.createElement('a');
            anchor.href = `#${heading.id}`;
            anchor.textContent = title;
            anchor.id = `a${heading.id}`
            anchor.style.display = 'block'
            anchor.style.textDecoration = 'none'
            anchor.style.color = 'var(--font-color)'
            anchor.style.overflow = 'hidden'
            anchor.style.textOverflow = 'ellipsis'
            anchor.style.whiteSpace = 'nowrap'
            anchor.style.maxWidth = '100%'
            // if(index===0) {
            //   anchor.style.color = '#FFBB46'
            // }
            this.anchorArr.push(anchor)
            
            //使用 event.preventDefault() 阻止了默认的链接跳转行为，
            //然后通过 getAttribute 获取到链接中的锚点标识符，
            //并将它作为新的 URL 传递给 window.location.replace() 方法
            anchor.addEventListener('click', function(event) {
              event.preventDefault(); // 阻止默认的链接跳转行为
              var targetId = this.getAttribute('href');
              window.location.replace(targetId);
            });


            // 创建目录项
            const listItem = document.createElement('li');
            listItem.style.marginLeft = `${(level - 1) * 15}px`; // 根据级别设置缩进
            listItem.appendChild(anchor)

            // 将目录项添加到目录容器中
            tocList.appendChild(listItem);
            this.lastIndex = index
        });

        

    })
  },
  handleScroll(pageHeight, articleCard) {
    this.scrollDistance = articleCard.scrollTop
    /**
     * 1、在headingsOffset中会保存每个标题的滚动高度
     * 2、用户滚动时监听并获取当前滚动高度scrollDistance
     * 3、while遍历，每次判断headingsOffset中下一个标题的高度是否小于当前滚动的高度
     * 4、如果小于，则进行一个排他处理，将当前标题目录设为中间并高亮
     * 5、第二个while用于判断向顶部滚动时的目录选中高亮
     * 
     * 这里之所以要每次activeToc只加一，遍历每一个标题令其居中高亮，是为了有一个滚动高亮的效果
     * 为了能准确对应到对应标题，并且看起来不是很生硬，就要设置一个缓冲区this.scrollDistance + 10
     */
    while(this.headingsOffset[this.activeToc + 1]&&(this.scrollDistance + pageHeight - pageHeight/3) >= this.headingsOffset[this.activeToc + 1]) {
      this.activeToc++
      this.anchorArr.forEach(anchor => {
        anchor.style.color = 'var(--font-color)'
      })
      this.anchorArr[this.activeToc].scrollIntoView({
        block: 'center'
      })
      this.anchorArr[this.activeToc].style.color = '#FFBB46'
    }
    while(this.headingsOffset[this.activeToc - 1]&&this.scrollDistance - 10 <= this.headingsOffset[this.activeToc - 1]){
      this.activeToc--
      this.anchorArr.forEach(anchor => {
        anchor.style.color = 'var(--font-color)'
      })
      this.anchorArr[this.activeToc].scrollIntoView({
        block: 'center'
      })
      this.anchorArr[this.activeToc].style.color = '#FFBB46'
    }
  },
    expend() {
      this.isExpend = !this.isExpend
      this.$emit('expendToc')
    }
  },
  mounted() {
    //添加一个防抖
    let debouncedGenerateTOC = debounce(this.generateTOC, 500)

    // //监听DOM元素内部的变化
    let observer = new MutationObserver(debouncedGenerateTOC);
    observer.observe(document.getElementsByClassName('content')[0], {
      childList: true,
      subtree: true
    });

    // let timer = null
    // if(document.getElementsByClassName('content')[0].innerHTML.length > 0) {
    //     this.generateTOC()
    //   }else {
    //     timer = setInterval(() => {
    //       if(document.getElementsByClassName('content')[0].innerHTML.length > 0) {
    //         this.generateTOC()
    //         clearInterval(timer)
    //       }
    //     },300)
    //   }
  }
}
</script>

<style>

.expendArraydown {
    transform: rotate(-45deg);
}

.expendArrayup {
    transform: rotate(135deg);
}

.expendArray {
    position: absolute;
    width: .8vw;
    height: .8vw;
    top: 1vw;
    right: 2vw;
    opacity: .9;
    cursor: pointer;
    border: 1px solid var(--font-color);
    border-left: none;
    border-bottom: none;
    transition: .3s;
}

  .tocListContainer {
    position: relative;
    padding: 2%;
    background-color: var(--infocard-bg-color);
    border: 5px solid var(--infocard-bg-color);
    overflow: auto;
    list-style: none;
    line-height: 36px;
    text-align: left;
    color: var(--font-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #tocList {
    height: 90%;
  }

  #tocList span {
    display: block;
    font-size: 22px;
    margin-top: -13px;
  }

  #tocList hr {
    margin: 2vw 0 1vw;
  }

  #tocList::-webkit-scrollbar {
      width: 10px;
      /*height: 4px;*/
  }
  #tocList::-webkit-scrollbar-corner {
      background-color: var(--infocard-bg-color);
    }

  #tocList::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
  }
  #tocList::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
  }

</style>