import * as fs from 'fs';
import * as wavFileInfo from 'wav-file-info';

/**
 * 通过文件名称获取 wav 文件的信息
 * @param filename 要获取信息的 wav 文件的名称
 * @returns 返回包含 wav 文件信息的 Promise 对象
 */
export const getInfoByFilename = (filename: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    wavFileInfo.infoByFilename(filename, (err: any, info: any) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};


/**
 * 以 Buffer 的形式读取文件内容
 * @param filename 要读取的文件的名称
 * @returns 返回包含文件内容的 Promise 对象，文件内容以 Buffer 的形式呈现
 */
export const readFile = (filename: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err: any, data: Buffer) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/**
 * 将数据以 Buffer 的形式写入到文件中
 * @param filename 用于接收数据的文件的名称
 * @param data 需要写入的数据，以 Buffer 的形式呈现
 * @returns 当数据写入完成后解析的 Promise 对象
 */
export const writeFile = (filename: string, data: Buffer): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err: any) => {
      if (err) reject(err);
      resolve();
    });
  });
};

/**
 * 通过设定的时长来裁剪音频文件的末尾部分
 * @param source 作为输入的音频文件路径
 * @param size 要裁剪的时长，以秒为单位
 * @param target 裁剪后音频的保存路径，如未指定则覆盖源文件
 */
export const trimWavByTime = async (source: string, size?: number, target?: string): Promise<void> => {
  size ??= 0.5;
  target ??= source;
  try {
    const info = await getInfoByFilename(source);
    let bytesPerSecond = info.header.byte_rate;
    let lengthToTrim = bytesPerSecond * size;
    let data = await readFile(source);
    let updatedData = data.slice(0, data.length - lengthToTrim);
    await writeFile(target, updatedData);

  } catch (err) {
    console.error(err);
  }
};

import * as wavDecoder from 'wav-decoder';
/**
 * 固定末尾保留的静默时长做裁剪
 * @param source 作为输入的音频文件路径
 * @param silenceTime 保留的静默时长，以秒为单位。其余部分将被裁剪掉
 * @param target 裁剪后的音频的保存路径，如未指定则覆盖源文件
 * @returns 无返回值，操作完成后解析为完成
 */
export const trimTailSilence = async (source: string, silenceTime?: number, target?: string): Promise<void> => {
  silenceTime ??= 0.5;
  target ??= source;
  try {
    const buffer = await readFile(source);
    const decoded = await wavDecoder.decode(buffer);
    const samples = decoded.channelData[0];

    let nonSilentSampleIndex = samples.length - 1;

    // 从末尾开始运行循环, 如果遇到一个声音样本（大于阈值0.01），跳出循环
    for (let i = samples.length - 1; i >= 0; i--) {
      if (Math.abs(samples[i]) > 0.01) {
        nonSilentSampleIndex = i;
        break;
      }
    }

    // 计算保留空白音频的样本数
    let sampleRate = decoded.sampleRate;
    let silenceSamples = silenceTime * sampleRate;

    // 保证nonSilentSampleIndex + silenceSamples不超过所有样本量，否则不剪切
    if (nonSilentSampleIndex + silenceSamples > samples.length) {
      console.log("No need to trim. The silence duration at the end is less than the configured time.");
      return;
    }

    // 计算需要剔除的字节的长度
    let bytesPerSample = 2;  // 由于样本类型是Float32Array，每个样本的字节大小应为4
    let lengthToTrim = bytesPerSample * (samples.length - (nonSilentSampleIndex + silenceSamples));
    let updatedData = buffer.slice(0, buffer.length - lengthToTrim);

    await writeFile(target, updatedData);

  } catch (err) {
    console.error(err);
  }
};