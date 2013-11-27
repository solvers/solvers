module ApplicationHelper
	def fb_image
		@fb_id = fb_id
    "http://graph.facebook.com/#{@fb_id}/picture?type=square"
	end

	def fb_id
		user_signed_in?? current_user.authentications[0].uid : nil
	end

	def is_admin?
		fb_id == '597311355' #or true
	end

  def md(text)
		markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML,
	    :autolink => true, :space_after_headers => true)
    markdown.render(text).html_safe
  end
end
