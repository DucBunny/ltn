// Lấy toàn bộ link ảnh trong các thư mục (.png, .jpg, .jpeg)
const imagesDefault = Object.values(
  import.meta.glob('@/assets/images/default/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

const imagesD = Object.values(
  import.meta.glob('@/assets/images/d/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

const imagesQ = Object.values(
  import.meta.glob('@/assets/images/q/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

const imagesDQ = Object.values(
  import.meta.glob('@/assets/images/dq/*.{png,jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

export const ownerConfig = {
  default: {
    name: '',
    phone: '',
    images: imagesDefault,
  },
  d: {
    name: 'Vũ Ngọc Đức',
    phone: '0342321157',
    images: [...imagesDefault, ...imagesD],
  },
  q: {
    name: 'Lê Thị Quỳnh',
    phone: '0355920338',
    images: [...imagesDefault, ...imagesQ],
  },
  dq: {
    name: 'Đức & Quỳnh',
    phone: '0342321157',
    images: [...imagesDefault, ...imagesD, ...imagesQ, ...imagesDQ],
  },
}
