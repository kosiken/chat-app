import dayjs from 'dayjs';

export function formatDate(
    date: string | Date,
    format = 'MMMM DD, YYYY',
  ) {
    let day = typeof date === 'string' ? dayjs(date) : dayjs(date.getTime());
    if (!day) {
      return 'Error';
    }
    return day.format(format);
  }

  export function reduceString(text: string, length = 10): string {
    return text.length > length ? text.substring(0, length - 3) + '...' : text;
  }

  export function delayed(interval: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}