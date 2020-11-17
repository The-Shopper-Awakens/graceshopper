const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_51HoKPgIPlXyRn90sj4konby739jd6RRYkOAJl6PYyqP8e2qNHwub3jLkn7X1lvL47iZqUv1niX39R8d6tG4Av9XA00MS9wXW1O'

export default STRIPE_PUBLISHABLE
