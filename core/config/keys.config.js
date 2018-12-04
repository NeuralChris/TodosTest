const keyConfig = {
  abc: {
    limit: 5,
    sort: { due: 1 },
    where: {
      due: { $gt: Date.now() },
    },
  },
  def: {
    limit: 0,
    sort: { due: 1 },
    fields: 'title description',
    where: {},
  },
  ghi: {
    limit: 0,
    sort: { due: 1 },
    fields: 'title',
    where: {
      complete: false,
    },
  },
};

export default keyConfig;
