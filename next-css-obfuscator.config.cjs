module.exports = {
  enable: true,
  mode: 'simplify',
  refreshClassConversionJson: process.env.NODE_ENV !== 'production',
  allowExtensions: ['.tsx', '.ts', '.html'],
  blackListedFolderPaths: ['./.next/cache'],
}
