class JobsController < ApplicationController
  # GET /jobs
  # GET /jobs.json
  def index
		@remote = params[:filter] == 'remote'
		@billing = params[:billing] # ? params[:billing] : 'all'

		if view_context.is_admin?
			@jobs = Job.find(:all, :order => "created_at DESC")
		elsif @remote
			@jobs = Job.where("approved = ? AND remote = ?", true, true).order("created_at DESC")
		elsif @billing and @billing != 'All'
			@jobs = Job.where("approved = ? AND billing = ?", true, @billing).order("created_at DESC")
		else
	    @jobs = Job.where("approved = ?", true).order("created_at DESC")
		end

		respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @jobs }
    end
  end

  # GET /jobs/1
  # GET /jobs/1.json
  def show
    @job = Job.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @job }
    end
  end

  # GET /jobs/new
  # GET /jobs/new.json
  def new
    @job = Job.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @job }
    end
  end

  # GET /jobs/1/edit
  def edit
    @job = Job.find(params[:id])
  end

  # POST /jobs
  # POST /jobs.json
  def create
    @job = Job.new(params[:job])

    respond_to do |format|
      if @job.save
        # UserMailer.new_job_email(@job).deliver

        format.html { redirect_to @job, notice: 'Job was successfully created.' }
        format.json { render json: @job, status: :created, location: @job }
      else
        format.html { render action: "new" }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /jobs/1
  # PUT /jobs/1.json
  def update
    @job = Job.find(params[:id])
		@redirect = view_context.is_admin?? :jobs : @job
    respond_to do |format|
      if @job.update_attributes(params[:job])
        format.html { redirect_to @redirect, notice: 'Job was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jobs/1
  # DELETE /jobs/1.json
  def destroy
    @job = Job.find(params[:id])
    @job.destroy

    respond_to do |format|
      format.html { redirect_to jobs_url }
      format.json { head :no_content }
    end
  end
end
