Rails.application.config.middleware.use OmniAuth::Builder do
  # The following is for facebook
  provider :facebook, '580645801988575', 'cb67b2d7c551013fae51380ba4e71dc0', {:scope => 'email'}
end
