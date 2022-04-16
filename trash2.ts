import React, {
    memo,
    useMemo,
    useRef,
    useState,
    useEffect,
    useCallback,
  } from 'react';
  import {
    View,
    Text,
    Dimensions,
    ScrollView,
    Button,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';
  import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
    BaseScrollView,
  } from 'recyclerlistview'; // Version can be specified in package.json
  
  const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
  };
  
  let containerCount = 0;
  
  const pageSize = 4;
  
  let { width } = Dimensions.get('window');
  
  const ListView = memo(() => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
  
    const _layoutProvider = useRef(layoutMaker()).current;
  
    const listView = useRef();
  
    const dataProvider = useMemo(() => dataProviderMaker(data), [data]);
  
    const load = useCallback(
      async (data, more = false) => {
        try {
          if (more) setIsLoadingMore(!!more);
          else setIsLoading(true);
  
          const resData = await fake(data);
          setData(resData);
  
          setData(data);
        } catch (e) {
          console.log(e);
        } finally {
          if (more) {
            setIsLoadingMore(false);
          } else {
            setIsLoading(false);
            setIsLoadingMore(false);
            !loaded && setLoaded(true);
          }
        }
      },
      [loaded]
    );
  
    // const loadMore = () => {
    //   console.log('end');
    //   load([...data, ...generateArray(pageSize)], true);
    // };
  
    const simpleLoadOneItem = useCallback((data) => { setData(data); },[]);
  
    const loadOneItemAtTop = () => {
      console.log('Adding one new item at the TOP');
      simpleLoadOneItem([...generateArray(1, data.length),...data, ]);
    };
  
    const loadOneItemAtBottom = () => {
      console.log('Adding one new item at the BOTTOM');
      simpleLoadOneItem([...data, ...generateArray(1, data.length)]);
    };
    const refresh = async () => {
      load(generateArray(pageSize));
    };
  
    useEffect(() => {
      // const timeout = setTimeout(() => {
      //   //  listView?.scrollTo({y: 300, animated: true});
      // }, 5000);
  
      load(generateArray(pageSize));
  
      return () => {
        // clearTimeout(timeout);
      };
    }, [load]);
  
    if (!loaded && isLoading)
      return (
        <ActivityIndicator
          style={{ marginTop: '50%', alignSelf: 'center' }}
          size="large"
        />
      );
  
    if (!data.length) return null;
  
    return (
      <View style={{ flex: 1, paddingVertical: 80 }}>
        <RecyclerListView
          // ref={listView}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={loaded && isLoading}
                onRefresh={() => refresh()}
              />
            ),
          }}
          renderFooter={() => <RenderFooter loading={isLoadingMore} />}
          // onEndReached={() => loadMore()}
          // onEndReachedThreshold={1}
          // externalScrollView={ExternalScrollView}
          layoutProvider={_layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
        />
  
        <Button title="Load 1 at top" onPress={() => loadOneItemAtTop()} />
        <Button title="Load 1 at bottom" onPress={() => loadOneItemAtBottom()} />
      </View>
    );
  });
  


































  
  const layoutMaker = () =>
    new LayoutProvider(
      (index) => 1,
      (type, dim) => {
        dim.width = 200,
        dim.height = 100
      }
    );
  
  const rowRenderer = (type, data) => {
    
    // return <RenderedItem data={data} />
    // return <PureRenderedItem data={data} />
    return <RenderedContainer data={data} />
  };
  
  
  
  class RenderedItem extends React.Component {
    shouldComponentUpdate(newProps) {
      // console.log(`New data: ${newProps.data} Previous data:${this.props.data}`)
      return newProps.data != this.props.data;
    }
    render() {
      console.log(`RENDINGING RenderedItem - Data ${this.props.data}\n`);
      return <Text style={{width: 200, height: 100}}>Data: {this.props.data}</Text>
    }
  }
  
  class PureRenderedItem extends React.PureComponent {
    render() {
      console.log(`RENDINGING PureRenderedItem - Data ${this.props.data}`);
      return <Text style={{width: 200, height: 100}}>Data: {this.props.data}</Text>
    }
  }
  
  class RenderedContainer extends React.Component {
    shouldComponentUpdate(newProps) {
      // console.log(`New data: ${newProps.data} Previous data:${this.props.data}`)
      return newProps.data != this.props.data;
    }
    render() {
      console.log(`RENDINGING RenderedContainer - Data ${this.props.data}\n`);
      // return <RenderedItem data={this.props.data} />
      return <PureRenderedItem data={this.props.data} />
    }
  }
  
  
  const RenderFooter = ({ loading }) =>
    loading && (
      <ActivityIndicator
        style={{ margin: 20, alignSelf: 'center', flex: 1 }}
        size="large"
      />
    );
  
  const dataProviderMaker = (data) =>
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);
  
  const generateArray = (n, base = 0) => {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = i + base;
    }
    return arr;
  };
  
  // class ExternalScrollView extends BaseScrollView {
  //   scrollTo = (...args) => {
  //     if (this._scrollViewRef) {
  //       this._scrollViewRef.scrollTo(...args);
  //     }
  //   };
  
  //   render() {
  //     return (
  //       <ScrollView
  //         {...this.props}
  //         ref={(scrollView) => {
  //           this._scrollViewRef = scrollView;
  //         }}
  //       />
  //     );
  //   }
  // }
  
  // class CellContainer extends React.Component {
  //   constructor(args) {
  //     super(args);
  //     this._containerId = containerCount++;
  //   }
  //   render() {
  //     return (
  //       <View {...this.props}>
  //         {this.props.children}
  //         <Text>Cell Id: {this._containerId}</Text>
  //       </View>
  //     );
  //   }
  // }
  
  const fake = (data) => {
    return new Promise(function (resolve, reject) {
      try {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      } catch (e) {
        reject(e);
      }
    });
  };
  
  export default ListView;
  
  // const styles = {
  //   container: {
  //     justifyContent: 'space-around',
  //     alignItems: 'center',
  //     flex: 1,
  //     backgroundColor: 'orange',
  //   },
  //   containerGridLeft: {
  //     justifyContent: 'space-around',
  //     alignItems: 'center',
  //     flex: 1,
  //     backgroundColor: 'yellow',
  //   },
  //   containerGridRight: {
  //     justifyContent: 'space-around',
  //     alignItems: 'center',
  //     flex: 1,
  //     backgroundColor: 'blue',
  //   },
  // };
  