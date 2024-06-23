const wavProcessor = require('wav-file-processor');  // 这里应该是你的模块名称

describe('wavProcessor methods', () => {
  test('trimWavByTime should trim the audio file correctly', async () => {
    const source = 'source.wav';
    const size = 10;
    const target = 'target.wav';

    // 假设 wavProcessor.trimWavByTime 方法返回一个解析为 undefined 的 Promise
    wavProcessor.trimWavByTime = jest.fn().mockResolvedValue(undefined);

    await expect(wavProcessor.trimWavByTime(source, size, target)).resolves.toBeUndefined();
    expect(wavProcessor.trimWavByTime).toHaveBeenCalledWith(source, size, target);
  });

  test('trimTailSilence should trim the audio file correctly', async () => {
    const source = 'source.wav';
    const silenceTime = 5;
    const target = 'target.wav';

    // 假设 wavProcessor.trimTailSilence 方法返回一个解析为 undefined 的 Promise
    wavProcessor.trimTailSilence = jest.fn().mockResolvedValue(undefined);

    await expect(wavProcessor.trimTailSilence(source, silenceTime, target)).resolves.toBeUndefined();
    expect(wavProcessor.trimTailSilence).toHaveBeenCalledWith(source, silenceTime, target);
  });
});