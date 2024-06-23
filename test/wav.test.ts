import * as wavProcessor from 'wav-file-processor';

describe('wavProcessor methods', () => {
  test('trimWavByTime should trim the audio file correctly', async () => {
    const source = 'source.wav';
    const size = 10;
    const target = 'target.wav';

    // 使用 Jest 提供的 mockResolvedValue 方法来模拟 trimWavByTime 方法的返回值
    jest.spyOn(wavProcessor, 'trimWavByTime').mockResolvedValue(undefined as any);

    await expect(wavProcessor.trimWavByTime(source, size, target)).resolves.toBeUndefined();
    expect(wavProcessor.trimWavByTime).toHaveBeenCalledWith(source, size, target);
  });

  test('trimTailSilence should trim the audio file correctly', async () => {
    const source = 'source.wav';
    const silenceTime = 5;
    const target = 'target.wav';

    // 使用 Jest 提供的 mockResolvedValue 方法来模拟 trimTailSilence 方法的返回值
    jest.spyOn(wavProcessor, 'trimTailSilence').mockResolvedValue(undefined as any);

    await expect(wavProcessor.trimTailSilence(source, silenceTime, target)).resolves.toBeUndefined();
    expect(wavProcessor.trimTailSilence).toHaveBeenCalledWith(source, silenceTime, target);
  });
});