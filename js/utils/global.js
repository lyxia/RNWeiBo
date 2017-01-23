import Storage from 'react-native-storage'
import {AsyncStorage} from 'react-native'

const storage = new Storage({
  //最大容量，默认值1000条数据循环存储
  size: 1000,
  //存储引擎，不提供则为内存
  storageBackend: AsyncStorage,
  //过期时间,默认一整天（1000 * 3600 * 24 毫秒）,设置null为不过期
  defaultExpires: null,
  //读写时在内存中缓存数据
  enableCache: true,
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  //sync: require('./sync')
})
global.storage = storage


