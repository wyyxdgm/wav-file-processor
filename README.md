# WAV File Processor

该模块提供了处理 WAV 音频文件的实用工具。通过这个模块，你可以对 WAV 文件进行裁剪，以及读取和写入文件的操作。

## Features

- 通过设定的时长来裁剪音频文件的末尾部分
- 固定末尾保留的静默时间做裁剪
- 通过文件名称获取 WAV 文件信息
- 以 Buffer 的形式读取文件内容
- 将数据以 Buffer 的形式写入到文件中

## How to Use

首先，你需要将该模块安装到你的项目中：

```bash
npm install wav-file-processor
```

然后，在你的代码文件中 import 后就可以使用：

```typescript
import * as wavProcessor from "wav-file-processor";

// 裁剪文件的末尾
wavProcessor.trimWavByTime(source, size, target);
// 获取文件信息
const info = await wavProcessor.getInfoByFilename(filename);
// 读取文件内容
const data = await wavProcessor.readFile(filename);
// 将数据写入到文件中
await wavProcessor.writeFile(filename, data);
```

## API

### getInfoByFilename

获取指定 WAV 文件的信息。

**Syntax:**

```typescript
getInfoByFilename(filename: string): Promise<any>
```

**Parameters:**

- `filename` (string): 要获取信息的 WAV 文件的名称。

**Return value:**

返回一个 Promise 对象，该对象将解析为包含指定 WAV 文件信息的对象。

### trimWavByTime

通过设定的时长来裁剪音频文件的末尾部分。

**Syntax:**

```typescript
trimWavByTime(source: string, size?: number, target?: string): Promise<void>
```

**Parameters:**

- `source` (string): 作为输入的音频文件路径。
- `size` (number): 要裁剪的时长，以秒为单位。
- `target` (string): 裁剪后音频的保存路径，如未指定则覆盖源文件。

**Return value:**

返回一个 Promise 对象，当音频文件被成功裁剪后，该 Promise 对象将会被解析。

```ts
// 导入该模块
import * as wavProcessor from "wav-file-processor";

// 使用 trimWavByTime 方法来裁剪音频文件的末尾部分
wavProcessor
  .trimWavByTime("source.wav", 10, "target.wav")
  .then(() => {
    console.log("音频文件裁剪完成");
  })
  .catch((error) => {
    console.error("音频文件裁剪时发生错误: ", error);
  });
```

### trimTailSilence

固定末尾保留的静默时长做裁剪。

**Syntax:**

```typescript
trimTailSilence(source: string, silenceTime?: number, target?: string): Promise<void>
```

**Parameters:**

- `source` (string): 作为输入的音频文件路径。
- `silenceTime` (number): 保留的静默时长，以秒为单位。其余部分将被裁剪掉。
- `target` (string): 裁剪后的音频的保存路径，如未指定则覆盖源文件。

**Return value:**

返回一个 Promise 对象，当音频文件被成功裁剪后，该 Promise 对象将会被解析。

```ts
// 使用 trimTailSilence 方法来固定末尾保留的静默时长做裁剪
wavProcessor
  .trimTailSilence("source.wav", 5, "target.wav")
  .then(() => {
    console.log("音频文件裁剪完成");
  })
  .catch((error) => {
    console.error("音频文件裁剪时发生错误: ", error);
  });
```

### readFile

读取指定文件的内容。

**Syntax:**

```typescript
readFile(filename: string): Promise<Buffer>
```

**Parameters:**

- `filename` (string): 要读取的文件的名称。

**Return value:**

返回一个 Promise 对象，该对象将解析为一个 Buffer，该 Buffer 包含指定文件的内容。

### writeFile

将 Buffer 数据写入到指定的文件中。

**Syntax:**

```typescript
writeFile(filename: string, data: Buffer): Promise<void>
```

**Parameters:**

- `filename` (string): 需要接收数据的文件的名称。
- `data` (Buffer): 需要写入的数据。

**Return value:**

返回一个 Promise 对象，当数据被成功写入文件后，该 Promise 对象将会被解析。

## Contribute

我们欢迎任何形式的贡献，包括但不限于提交 bug 报告、改进代码、提供新的功能思路。

## License

此模块遵循 [MIT 协议](LICENSE.md)。
