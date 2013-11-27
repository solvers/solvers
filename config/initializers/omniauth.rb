Rails.application.config.middleware.use OmniAuth::Builder do
  # The following is for facebook
  provider :facebook, '283643648422021', 'e2d0b2983b53f3008b03671d7273b4b8', {:scope => 'email'}
 
  # If you want to also configure for additional login services, they would be configured here.
end
